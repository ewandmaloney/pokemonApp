import { CarouselImagePipe } from './carousel-image.pipe';

describe('CarouselImagePipe', () => {
  it('create an instance', () => {
    const pipe = new CarouselImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return value', () => {
    const pipe = new CarouselImagePipe();
    const value = 'dsad'
    expect(pipe.transform(value)).toBe(value);
  })

  it('should return no image path', () => {
    const pipe = new CarouselImagePipe();
    const noImage = '../../assets/no-image.PNG';
    expect(pipe.transform(undefined)).toBe(noImage)

  })
});
