import DefaultLayout from "../../_layouts/default.js";
import Link from "next/link";
import { getConfigForCategory, getAllPostsForTag, getAllTagsForTag } from "../api";
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
    <DefaultLayout title={props.title} description={props.description}>
      <p></p>
      <h1 style={{textAlign: "center"}}>List of all posts with tag "{props.tag}":</h1>
      <p></p>
      <List 
      size="large"
      dataSource={data}
      renderItem={item => <List.Item style={{justifyContent:"center"}}>{item}</List.Item>}
      />
    </DefaultLayout>
  );
}

export async function getStaticProps(context) {
  const config = await getConfigForCategory();
    return {
      props: {
        posts: await getAllPostsForTag(context.params.tag),
        tag: context.params.tag,  
        title: config.title,
        description: config.description,
      },
    };
  }
  
export async function getStaticPaths() {
    let paths = await getAllTagsForTag();
    paths = paths.map((tages) => ({
      params: { tag: tages.tag },
    }));
    return {
      paths: paths,
      fallback: false,
    };
  }
  
