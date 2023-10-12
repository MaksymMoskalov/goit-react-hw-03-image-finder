import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Blocks } from 'react-loader-spinner';
import css from './App.module.css';

export class App extends Component {
  state = {
    keyWord: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    loader: false,
  };

  hendlSubmiForm = text => {
    this.setState({ keyWord: text, page: 1, images: [], total: 0 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.setState({ loader: true });
      this.fetchImages(keyWord, page);
    }
  }

  fetchImages = async (keyWord, page) => {
    try {
      const { total, hits } = await getImages(keyWord, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: total,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      console.log('error: ', error);
    }
    this.setState({ loader: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={this.hendlSubmiForm} />
          <ImageGallery>
            {this.state.images.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    preview={webformatURL}
                    largeImage={largeImageURL}
                    tag={tags}
                  />
                );
              }
            )}
          </ImageGallery>
          <Button addPhotos={this.onLoadMore} />
        </div>
        {this.state.loader && (
          <Blocks
            wrapperClassName={css.Loader}
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        )}
      </>
    );
  }
}
