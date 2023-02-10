/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { useParams } from 'react-router-dom';

import data from '../../data/book.json'
import close_vector from '../../resources/icon/close_vector.svg'
import raise_vector from '../../resources/icon/raise_vector.svg';
import user from '../../resources/icon/user_reviews.png'
import cat from '../../resources/img/cat_image.png'
import img from '../../resources/img/image_book.png'
import { SwiperSlider } from '../slider/slider';

export const Book = () => {
    const {bookId} = useParams();
    const {book} = data;
    const {main,detail,reviews} = book[0];
    const [showReviewsList , setshowReviewsList] = useState(false);

    const star = [1,2,3,4,5];
    const starList = star.map((i,index)=>{
        const color = (index > 3 ) ? 'none' : '#FFBC1F';

        return ( 
            <svg width="21" height="19" viewBox="0 0 21 19" fill={color} key= {i}>
            <path d="M8.09798 6.30426L10.5 0.549456L12.902 6.30426C13.0419 6.63938 13.3576 6.86723 13.7187 6.89608L19.9493 7.39383L15.2036 11.4448C14.9276 11.6804 14.8064 12.0508 14.891 12.4042L16.3415 18.4636L11.0041 15.215C10.6945 15.0266 10.3055 15.0266 9.9959 15.215L4.65848 18.4636L6.10898 12.4042C6.19359 12.0508 6.07245 11.6804 5.79644 11.4448L1.05067 7.39383L7.28134 6.89608C7.64244 6.86723 7.9581 6.63938 8.09798 6.30426Z" stroke="#FFBC1F"/>
            </svg>
        )
    })

    const reviewsList = reviews.map((item,id) => (

        // eslint-disable-next-line react/no-array-index-key
        <div className="book__reviews-card" key={id}>
            <div className="book__reviews-card__wrapper">
                <img src={user} alt="user" />
                 <div className="book__reviews-card__user">
                    <h4>{item.author}</h4>
                    <h4 className='book__reviews-card-data'>{item.data}</h4>
                 </div>
            </div>
             <div className="book__reviews-card__star">{starList}</div>
            <p className="book__reviews-card__descr"> {item.text} </p>
        </div>
    ))

    return (
        <section className="book">
           <div className="container">
                <div className="book__main-block">
                    <div className="book__main-block-img">
                        {bookId === '0' ? <img data-test-id='slide-big' src={cat} alt='img'/>  : null }
                        {bookId === '1' ? <img data-test-id='slide-big' src={img} alt='img'/> : null}
                        {bookId > 1 ?  <SwiperSlider/> : null}
                    </div>
                    <div className="book__main-block-descr">
                        <h2>{main.title}</h2>
                        <h3>{main.author}</h3>
                        <button type='button'>{main.status}</button>
                        <div className="book__main-block-descr-about">
                            <h4>О книге</h4>
                            <p>{main.aboutOne}</p>
                            <p>{main.aboutTwo}</p>
                        </div>
                    </div>
                </div>
                <div className="book__score">
                    <h2> Рейтинг </h2>
                    <div className="devider"> </div>
                    <div className="book__score-star">
                        {starList}
                        <span>{main.score}</span> 
                    </div>
                </div>
                <div className="book__detail">
                    <h2>Подробная информация</h2>
                    <div className="devider"> </div>
                    <div className="book__detail-wrapper">
                        <div className="book__detail-small__block">
                            <p>Издательство</p>
                            <span> {detail.publisher}</span>
                            <p>Год издания</p>
                            <span>{detail.year} </span>
                            <p>Страниц  </p>
                            <span>{detail.pages} </span>
                            <p>Переплёт</p>
                            <span>{detail.binding} </span>
                           
                            <p>Формат</p>
                            <span>{detail.format} </span>
                        </div>
                        <div className="book__detail-big__block">
                            <p>Жанр</p>
                            <span>{detail.genre} </span>
                            <p>Вес</p>
                            <span>{detail.weight} </span>
                            <p>ISBN</p>
                            <span>{detail.ISBN} </span>
                            <p>Изготовитель</p>
                            <span>{detail.maker} </span>
                        </div>
                    </div>
                </div>
                
                <div className='book__reviews'>
                    
             
                    <div className="book__reviews-title" role="button"  tabIndex="0"
                         onClick={()=> setshowReviewsList(!showReviewsList)} data-test-id='button-hide-reviews'>
                            
                        <h2 className='book__reviews-title'>Отзывы </h2>
                        <span>2</span>
                        <img src={showReviewsList ?  close_vector :  raise_vector} alt="vector"
                                className='book__reviews-vector'/>
                    </div>
                   
                    <div className="devider"> </div>
                    {showReviewsList ?  reviewsList : null}
                    <button data-test-id='button-rating' type='button' className='book__reviews-button'> оценить книгу </button>
                </div>
           </div>
        </section>
    )
}