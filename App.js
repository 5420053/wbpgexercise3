import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">可愛らしい犬 画像集</h1>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={props.src} alt="dog cat!" />
          </figure>
        </div>
      </div>
    );
  }

  function Loading() {
    return <p>Loading...</p>;
  }  
  
  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
      return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
          return (
            <div key={url} className="column is-3">
              <Image src={url} />
            </div>
          );
        })}
      </div>
    );
  }
  
  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { breed } = event.target.elements;
      props.onFormSubmit(breed.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="shiba">
                  <option value="shiba">Shiba</option>
                  <option value="akita">Akita</option>
                  <option value="affenpinscher">Affenpinscher</option>
                  <option value="dhole">Dhole</option>
                  <option value="chow">Chow</option>
                  <option value="doberman">Doberman</option>
                  <option value="pug">Pug</option>
                  <option value="beagle">Beagle</option>
                  <option value="bluetick">Bluetick</option>
                  <option value="boxer">Boxer</option>
                  <option value="bouvier">Bouvier</option>
                  <option value="puggle">Puggle</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
      fetchImages("shiba").then((urls) => {
        setUrls(urls);
      });
    }, []);
    function reloadImages(breed) {
      fetchImages(breed).then((urls) => {
        setUrls(urls);
      });
    }
    return (
      <main>
        <div className="content has-text-centered">
          <p></p>
          <p>12種類の中から選択した犬の画像を表示するWebサイトです！</p>
          <p>下部にあるフォームから犬種を選択して、Reloadボタンを押すことで画像（ランダムに最大12枚）を表示します。</p>
        </div>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Dog images are retrieved from Dog API</p>
          <p>
            <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
          </p>
          <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
          <p>加藤優貴 5420053</p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;