import DefaultLayout from "../_layouts/default.js";
import Link from "next/link";
import { getConfig, getAllPosts } from "./api";
import { List } from "antd";

export default function Blog(props) {
  const data = props.posts.map(function (post, idx) {
    return (
        <Link href={"/" + post.slug}>
          <a className="link-a">{post.title}</a>
        </Link>
    );
  })
  return (
    <DefaultLayout title={props.title} description={props.description} page="posts">
      <p></p>
      <h1 style={{textAlign: "center"}}>List of all posts:</h1>
      <p></p>
      <List 
      size="large"
      dataSource={data}
      renderItem={item => <List.Item style={{justifyContent:"center"}}>{item}</List.Item>}
      />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const config = await getConfig();
  const allPosts = await getAllPosts();

  return {
    props: {
      posts: allPosts,
      title: config.title,
      description: config.description,
    },
  };
}