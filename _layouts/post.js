import DefaultLayout from "./default";
import Head from "next/head";
import Link from "next/link";

export default function PostLayout(props) {
  return (
    <DefaultLayout>
      <Head>
        <title>{props.title}</title>
      </Head>
      <article>
        <p></p>
        <h1>{props.title}</h1>
        <p></p>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
        <p></p>
        <div>
          Categories:{" "}
          {props.category.map(function (categ, idx) {
            return (
              <Link href={"/categories/" + categ}>
                <a className="link-slug">{categ} </a>
              </Link>
            );
          })}{" "}
        </div>
        <div>
          Tags:{" "}
          {props.tags.map(function (tag, idx) {
            return (
              <Link href={"/tags/" + tag}>
                <a className="link-slug">{tag} </a>
              </Link>
            );
          })}{" "}
        </div>
      </article>
    </DefaultLayout>
  );
}
