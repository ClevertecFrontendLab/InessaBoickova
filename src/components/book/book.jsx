/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import close_vector from '../../resources/icon/close_vector.svg'
import raise_vector from '../../resources/icon/raise_vector.svg';
import userDefalt from '../../resources/icon/user_reviews.png'
import { useService } from '../../services/services';
import { SwiperSlider } from '../slider/slider';
import { Spinner } from '../spinner/spinner';

export const Book = () => {
    const {bookId} = useParams();
    const {getBook} = useService();
    const [showReviewsList , setshowReviewsList] = useState(true);
    const loading = useSelector(state=> state.loading);
    const book = useSelector(state=> state.book);

    useEffect (()=> {
        getBook(bookId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
     
    const view = () => {
        const {images,authors,title,description,format,issueYear,pages,producer,publish,cover,categories,weight,ISBN,booking,rating ,comments} = book;
        const star = [1,2,3,4,5];
        
        const setStar = (num) => {
            const starList = star.map((i,index)=>{
                const color = (index > Math.round(num) - 1  ) ? 'none' : '#FFBC1F';
        
                return ( 
                    <svg width="21" height="19" viewBox="0 0 21 19" fill={color} key= {i}>
                    <path d="M8.09798 6.30426L10.5 0.549456L12.902 6.30426C13.0419 6.63938 13.3576 6.86723 13.7187 6.89608L19.9493 7.39383L15.2036 11.4448C14.9276 11.6804 14.8064 12.0508 14.891 12.4042L16.3415 18.4636L11.0041 15.215C10.6945 15.0266 10.3055 15.0266 9.9959 15.215L4.65848 18.4636L6.10898 12.4042C6.19359 12.0508 6.07245 11.6804 5.79644 11.4448L1.05067 7.39383L7.28134 6.89608C7.64244 6.86723 7.9581 6.63938 8.09798 6.30426Z" stroke="#FFBC1F"/>
                    </svg>
                )
            })

            return starList
        }

        const classBtn = booking ?  'book__button-booked':  'book__button';
        const btnTitle = (booking) 
        ? `занята до ${new Date(booking.dateOrder).toLocaleDateString().substring(0,5)}`
        : 'Забронировать'
     
        const reviewsList = (comments) ?  comments.map((item) => {
            const {user,id,text,createdAt} = item;

            return (
                <div className="book__reviews-card" key={id}>
                <div className="book__reviews-card__wrapper">
                    <img src={(user.avatarUrl)? ' ' : userDefalt} alt="user" />
                     <div className="book__reviews-card__user">
                        <h4>{`${user.firstName} ${user.lastName}`}</h4>
                        <h4 className='book__reviews-card-data'>{new Date(createdAt).toLocaleDateString()}</h4>
                     </div>
                </div>
                 <div className="book__reviews-card__star">{setStar(item.rating)}</div>
                <p className="book__reviews-card__descr"> {text} </p>
            </div>
            )
        }) : null

        return (
            <section className="book">
            <div className="container">
                 <div className="book__main-block">
                     <div className="book__main-block-img">
                        {/* <img data-test-id='slide-big' src={img} alt='img'/>   */}
                       {images ?  <SwiperSlider images={images}/> : null}
                     </div>
                     <div className="book__main-block-descr">
                         <h2>{title}</h2>
                         <h3>{authors}</h3>
                         <button className={classBtn} type='button'>{btnTitle}</button>
                         <div className="book__main-block-descr-about">
                             <h4>О книге</h4>
                             <p>{description}</p>
                         </div>
                     </div>
                 </div>
                 <div className="book__score">
                     <h2> Рейтинг </h2>
                     <div className="devider"> </div>
                     <div className="book__score-star">
                        {(rating)? setStar(rating) : <h2>ещё нет оценок</h2>}
                         <span>{rating}</span> 
                     </div>
                 </div>
                 <div className="book__detail">
                     <h2>Подробная информация</h2>
                     <div className="devider"> </div>
                     <div className="book__detail-wrapper">
                         <div className="book__detail-small__block">
                             <p>Издательство</p>
                             <span>{producer}</span>
                             <p>Год издания</p>
                             <span>{issueYear} </span>
                             <p>Страниц</p>
                             <span>{pages}</span>
                             <p>Переплёт</p>
                             <span>{cover}</span>
                            
                             <p>Формат</p>
                             <span>{format} </span>
                         </div>
                         <div className="book__detail-big__block">
                             <p>Жанр</p>
                             <span>{categories} </span>
                             <p>Вес</p>
                             <span>{weight} </span>
                             <p>ISBN</p>
                             <span>{ISBN}</span>
                             <p>Изготовитель</p>
                             <span>{publish} </span>
                         </div>
                     </div>
                 </div>
                 
                 <div className='book__reviews'>
                     
                     <div className="book__reviews-title" role="button"  tabIndex="0"
                          onClick={()=> setshowReviewsList(!showReviewsList)} data-test-id='button-hide-reviews'>
                             
                         <h2 className='book__reviews-title'>Отзывы </h2>
                         <span>{comments ? comments.length : 0}</span>
                         <img src={showReviewsList ?  close_vector :  raise_vector} alt="vector"
                                 className='book__reviews-vector'/>
                     </div>
                    
                     <div className="devider"> </div>
                     {showReviewsList && comments ?  reviewsList : null}
                     <button data-test-id='button-rating' type='button' className='book__reviews-button'> оценить книгу </button>
                 </div>
            </div>
         </section>
        )
    }

    return (
        (loading ? <Spinner/> : view())
    )
       
}