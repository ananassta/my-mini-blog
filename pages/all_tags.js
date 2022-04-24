import DefaultLayout from "../_layouts/default.js";
import Link from "next/link";
import { getConfig, getAllTags } from "./api";
import { List } from "antd";

export default function Blog(props) {
  const data = props.tags.map(function (tag, idx) {
    return (
      <Link href={"/tags/" + tag.tag}>
        <a className="link-a">{tag.title}</a>
      </Link>
    );
  })
  return (
    <DefaultLayout title={props.title} description={props.description} page="tags">
      <p></p>
      <h1 style={{textAlign: "center"}}>List of all tags:</h1>
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
  const allTags = await getAllTags();

  return {
    props: {
      tags: allTags,
      title: config.title,
      description: config.description,
    },
  };
}
