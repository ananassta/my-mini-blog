import DefaultLayout from "../_layouts/default.js";
import Link from "next/link";
import { getConfig, getAllCategories } from "./api";
import { List } from "antd";

export default function Blog(props) {
  const data = props.categories.map(function (categ, idx) {
    return (
      <Link href={"/categories/" + categ.category}>
        <a className="link-a">{categ.title}</a>
      </Link>
    );
  })
  return (
    <DefaultLayout title={props.title} description={props.description} page="categories">
      <p></p>
      <h1 style={{textAlign: "center"}}>List of all categories:</h1>
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
  const allCategories = await getAllCategories();

  return {
    props: {
      categories: allCategories,
      title: config.title,
      description: config.description,
    },
  };
}
