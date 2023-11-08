import styled from '@emotion/styled';
import landingImg from '../../../assets/landing-img.png';

const ImageLanding = () => {
  const Img = styled('img')({
    width: '100%',
    objectFit: 'cover',
  });

  return <Img src={landingImg} alt='Imagen Landing' />;
};

export default ImageLanding;
