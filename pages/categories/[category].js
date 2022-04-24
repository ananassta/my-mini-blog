import DefaultLayout from "../../_layouts/default.js";
import Link from "next/link";
import { getConfigForCategory, getAllPostsForCategory, getAllCategoriesForCategory } from "../api";
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
      <h1 style={{textAlign: "center"}}>List of all posts for category "{props.category}":</h1>
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
        posts: await getAllPostsForCategory(context.params.category),
        category: context.params.category,  
        title: config.title,
        description: config.description,
      },
    };
  }
  
export async function getStaticPaths() {
    let paths = await getAllCategoriesForCategory();
    paths = paths.map((categ) => ({
      params: { category: categ.category },
    }));
    return {
      paths: paths,
      fallback: false,
    };
  }
  
