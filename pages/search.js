import Search from '../components/search'
import DefaultLayout from "../_layouts/default.js";
import { getConfig } from './api';

export default function Home(props) {
  return (
    <DefaultLayout title={props.title} description={props.description} page="search">
      <p></p>
      <section style={{textAlign: "center"}}>
        <h2>Search</h2>
        <p></p>
        <Search />
      </section>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const config = await getConfig();

  return {
    props: {
      title: config.title,
      description: config.description,
    },
  };
}