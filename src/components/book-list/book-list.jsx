import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import cat from '../../resources/img/cat.png'
import { useService } from '../../services/services';
import { Spinner } from '../spinner/spinner';

export const BookList = () => {
    const styleCard = useSelector(state=> state.style);
    const booksList = useSelector(state=> state.booksList);
    const loading = useSelector(state=> state.loading);
    const {getBooksList} = useService();
    const {category} = useParams();

    useEffect (()=> {
      getBooksList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const list = booksList.map((item,ind) => {
      const {rating,booking,image,title,id,authors,issueYear} = item;
      const star = [1, 2, 3, 4,5] ;
      const starList = star.map((i,index)=>{
          const color = (index > Math.round(rating) - 1 ) ? 'none' : '#FFBC1F';
  
          return ( 
              <svg width="21" height="19" viewBox="0 0 21 19" fill={color} key= {i}>
              <path d="M8.09798 6.30426L10.5 0.549456L12.902 6.30426C13.0419 6.63938 13.3576 6.86723 13.7187 6.89608L19.9493 7.39383L15.2036 11.4448C14.9276 11.6804 14.8064 12.0508 14.891 12.4042L16.3415 18.4636L11.0041 15.215C10.6945 15.0266 10.3055 15.0266 9.9959 15.215L4.65848 18.4636L6.10898 12.4042C6.19359 12.0508 6.07245 11.6804 5.79644 11.4448L1.05067 7.39383L7.28134 6.89608C7.64244 6.86723 7.9581 6.63938 8.09798 6.30426Z" stroke="#FFBC1F"/>
              </svg>
          )
      })
      const classBtn = booking ?  'card__button-booked':  'card__button';     
      const img = image ? `https://strapi.cleverland.by${image.url}` : cat;
      const titleCard = title.length <= 50 ? title : `${title.substring(0, 50)}...`;
      const btnTitle = (booking) 
                    ? `занята до ${new Date(booking.dateOrder).toLocaleDateString().substring(0,5)}`
                    : 'Забронировать'

          if (ind < 11) {
            return (
              <NavLink to={`/books/${category}/${id}`} key={id} >
                  <div className="card" data-test-id='card' >
                     <img src={img} alt="img" className='card__img' />
                      <div className="card__wrapper">
                         <div className="card__score"> {(rating)? starList : <h2>ещё нет оценок</h2>} </div>
                         <h3 className='card__title'> {titleCard}</h3>
                         <h4 className='card__subtitle'>{authors[0]},{issueYear} </h4>
                         <button className={classBtn} type='button'> {btnTitle} </button>
                   </div>
             </div>
              </NavLink>
             )
          }

            return (
              <NavLink to={`/books/${category}/${id}`} key={id} className= ' hide'>
                  <div className="card" data-test-id='card' >
                     <img src={img} alt="img" className='card__img' />
                      <div className="card__wrapper">
                         <div className="card__score"> {(rating)? starList : <h2>ещё нет оценок</h2>} </div>
                         <h3 className='card__title'> {titleCard}</h3>
                         <h4 className='card__subtitle'>{authors[0]},{issueYear} </h4>
                         <button className={classBtn} type='button'> {btnTitle} </button>
                   </div>
             </div>
              </NavLink>
             )
          
    })

    return (
      <div className={styleCard}>
        {loading ? <Spinner/> : list }
      </div>
    )
}