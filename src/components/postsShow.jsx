import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClicked() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/'); // After the action creator has finished, go back to posts list
    });
  }

  render() {
    // posts[this.props.match.params.id]; // the post we want to show out of a big list of posts!!!
    // this.props === ownProps
    const { post } = this.props;

    if (!post) {
      return <div>Loading…</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClicked.bind(this)}
          type="button"
        >Delete post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  // The component will receive only the post it cares about
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);