import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createSelector } from 'reselect';

import { useHooks } from '../../hooks/hooks';
import cat from '../../resources/img/cat.png'
import { useService } from '../../services/services';
import { EmptyBookList } from '../empty-book-list/empty-book-list';
import { Spinner } from '../spinner/spinner';

export const BookList = () => {
    const raiseFilter = useSelector(state => state.filters.raiseFilter)

    const filteredBookListSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.book.booksList,
      (filter , booksList) => {
        if (filter === 'Все'){
          return booksList
        }
        
        return booksList.filter((item)=> item.categories[0] === filter);
      }
    )

    const filteredBookList = useSelector(filteredBookListSelector);

    const styleCard = useSelector(state=> state.bookListStyle.style);
    const loading = useSelector(state=> state.book.loading);
    const error = useSelector(state=> state.book.error);
    const {getBooksList} = useService();
    const {setStar} = useHooks ();
    const {category} = useParams();

    useEffect (()=> {
      getBooksList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line no-negated-condition
    const list = ((!raiseFilter)
        ? filteredBookList.sort((a,b)=> b.rating - a.rating) 
        : filteredBookList.sort((a,b)=> a.rating - b.rating)).map((item) => {
        const {rating,booking,image,title,id,authors,issueYear} = item;
        const classBtn = booking ?  'card__button-booked':  'card__button';     
        const img = image ? `https://strapi.cleverland.by${image.url}` : cat;
        const titleCard = title.length <= 40 ? title : `${title.substring(0, 40)}...`;
        const btnTitle = (booking) 
                  ? `занята до ${new Date(booking.dateOrder).toLocaleDateString().substring(0,5)}`
                  : 'Забронировать'

        return (
            <NavLink to={`/books/${category}/${id}`} key={id} >
                <div className="card" data-test-id='card' >
                    <img src={img} alt="img" className='card__img' />
                    <div className="card__wrapper">
                        <div className="card__score"> {(rating)? setStar(rating) : <h2>ещё нет оценок</h2>} </div>
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
          {loading ? <Spinner/> : ((list.length === 0 && !error) ? <EmptyBookList/> : list )} 
      </div>
    )
}