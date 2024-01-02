import { NoImagePipe } from './no-image.pipe';

describe('NoImagePipe', () => {
  it('create an instance', () => {
    const pipe = new NoImagePipe();
    expect(pipe).toBeTruthy();
  });

  //Devuelve la imagen de pokemon si no existe
  it('should return noimage.png', () => {
    const pipe = new NoImagePipe();
    const noImage = '../../assets/no-image.PNG';
    expect(pipe.transform(undefined)).toBe(noImage);
  });

  //Devuelve la imagen de pokemon si existe
  it('should return pokemon image', () => {
    const pipe = new NoImagePipe();
    const image = {} as any;
    expect(pipe.transform({other: {'official-artwork': {front_default: image}}} as any)).toBe(image);
  });
});
