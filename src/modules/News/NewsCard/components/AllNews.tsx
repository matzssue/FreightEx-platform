import { useState, useEffect } from 'react';
import styles from './AllNews.module.scss';
export const AllNews = () => {
  const [news, setNews] = useState();
  const getAllNews = async () => {
    const query = 'Logistics';
    const encodedQuery: string = encodeURIComponent(query);

    const response = await fetch(
      `https://gnews.io/api/v4/search?q="${encodedQuery}"&lang=en&country=us&max=20&apikey=c3d716da1f290932626ccf800b31da16`,
    );

    const data = await response.json();

    console.log(data.articles);
    setNews(data.articles);
    console.log(data.articles);
    return data;
  };
  useEffect(() => {
    getAllNews();
  }, []);
  return (
    <>
      <header className={styles.header}>
        <h1>Transport, Logistics </h1>
        <h2>Explore the latest news, innovaions and successes in the transport and logitics</h2>
      </header>
      <section className={styles.news}>
        {news &&
          news.map((news, i) => (
            <div key={i} className={styles['news-card']}>
              <div className={styles.text}>
                <h3 className={styles.title}>{news.title}</h3>
                <h4 className={styles.description}>{news.description}</h4>
              </div>
              <img className={styles.image} src={news.image}></img>
              <span>
                <a className={styles.link} href={news.url}>
                  Read More
                </a>
                <p className={styles.time}>{news.publishedAt}</p>
              </span>
            </div>
          ))}
      </section>
    </>
  );
};
