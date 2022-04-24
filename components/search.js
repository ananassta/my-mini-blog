import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { List } from "antd";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    console.log("2");
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    console.log("3");
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div
      ref={searchRef}
    >
      <Input
        className="input-search"
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Search posts"
        prefix={<SearchOutlined style={{color: "gray"}}/>}
        type="text"
        value={query}
      />
      {active && results.length > 0 && (
        <List 
        size="large"
        dataSource={results.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={"../" + slug}>
              <a className="link-a">{title}</a>
            </Link>
          </li>
        ))}
        renderItem={item => <List.Item style={{justifyContent:"center"}}>{item}</List.Item>}
        />
      )}
    </div>
  );
}
