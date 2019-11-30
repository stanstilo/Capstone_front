import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      article: "",
      articles: [],
      articlesLength: 0 //use this so that you can keep track of changes and use component did update to change ui
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({});
    let articleData = {
      title: this.state.title,
      article: this.state.article,
      id: Math.random().toFixed(3)
    };
    console.log(articleData);

    let articleUrl = "/articles";

    fetch(articleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(articleData)
    })
      .then(result => result.json())
      .then(resp => {
        console.log(resp);
        this.setState({
          title: "",
          article: "",
          articlesLength: this.state.articlesLength + 1
          // articles: [...resp.data.data, ...this.state.articles]
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //this handles the loading of articles
  handleLoadArticle = () => {
    fetch("articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      // body:JSON.stringify(articleData)
    })
      .then(result => result.json())
      .then(resp => {
        console.log(resp);
        this.setState({
          articles: resp,
          articlesLength: resp.length
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDelete = id => {
    console.log(id);

    let articleUrl = `/articles/${id}`;

    fetch(articleUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(result => {
        result.json();
      })
      .then(resp => {
        this.setState({
          title: "",
          article: "",
          articlesLength: this.state.articlesLength - 1
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.handleLoadArticle();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.articlesLength !== this.state.articlesLength) {
      this.handleLoadArticle();
    }
  }

  render() {
    const { article, title } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          className="form-control my-3"
          placeholder="Article Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          className="form-control my-3"
          placeholder="Article Description"
          name="article"
          value={article}
          onChange={this.handleChange}
        ></textarea>
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary float-right"
        >
          Submit
        </button>

        <ul>
          {this.state.articles.length > 0 &&
            this.state.articles.map(item => {
              const { article, id, title } = item;
              return (
                <div key={id}>
                  <li>
                    <div>{title}</div>
                    <p>
                      {article}
                      <span
                        className="btn btn-danger ml-12"
                        onClick={() => {
                          this.handleDelete(id);
                        }}
                      >
                        delete
                      </span>
                    </p>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Form;
