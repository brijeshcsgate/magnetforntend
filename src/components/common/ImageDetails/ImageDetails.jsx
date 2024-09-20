import { dotIcon, upDownArrow } from '@/assets/Icons';
import './ShowImageGridView.css';

const ShowImageGridView = ({ images }) => {

  return (
    <div className='show-image-gv'>
      <div className='show-image-title'>
        <div className=' heading-600-16 c-blue1'>{'Vehicle Images'}</div>{' '}
        <div className='curser-pointer'>{upDownArrow({ width: 24, height: 24 })}</div>
      </div>
      <div className='img-gv-detail-container'>
        {images?.map((img) => (
          <div className='img-gv-detail-box' key={img.url}>
            <div className='img-gv-container'>
              <img src={img.url} alt={img.name} />
            </div>
            <div className='img-gv-name'>
              <div className='heading-400-14 c-blue1'>{img.name}</div> <span className='img-threedot'>{dotIcon({ width: 24, height: 24 })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowImageGridView;
