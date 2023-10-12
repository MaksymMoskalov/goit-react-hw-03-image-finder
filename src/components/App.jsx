import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    keyWord: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
  };

  hendlSubmiForm = text => {
    this.setState({ keyWord: text, page: 1, images: [], total: 0 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
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
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
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
        <Button onClick={this.onLoadMore} />
      </>
    );
  }
}
