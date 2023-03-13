/* eslint-disable eqeqeq */
import { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createSelector } from 'reselect';

import { useHooks } from '../../hooks/hooks';
import cat from '../../resources/img/cat.png'
import { useBooksServices } from '../../services/books';
import { EmptyBookList } from '../empty-book-list/empty-book-list';
import { Spinner } from '../spinner/spinner';

export const BookList = () => {
    const raiseFilter = useSelector(state => state.filters.raiseFilter);
    const valueInput = useSelector((state)=> state.filters.valueInput);

    const filteredBookListSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.book.booksList,
      (state)=> state.filters.valueInput,
      (filter , booksList) => {

        if (filter === 'Все книги'){ 
          return booksList.filter((item)=> {
            const title = item.title.toLowerCase();

            return title.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1
          })
        }
        // eslint-disable-next-line array-callback-return, consistent-return
        const result =  booksList.filter((item) => {
            if (item.categories.length <= 1){
                return item.categories[0] === filter
            }
        
            for (let i = 0; i <= item.categories.length ; i++){
                if (item.categories[i] === filter){
                    return item.categories[i] === filter
                }
            }
        });
      
        return result.filter((item)=> item.title.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1);
      }
    )

    const filteredBookList = useSelector(filteredBookListSelector);

    const styleCard = useSelector(state=> state.bookListStyle.style);
    const loading = useSelector(state=> state.book.loading);
    const error = useSelector(state=> state.book.error);
    const {getBooksList} = useBooksServices();
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
        const titleCard = title.length <= 55? title : `${title.substring(0, 55)}...`;
        const btnTitle = (booking) 
                  ? `занята до ${new Date(booking.dateOrder).toLocaleDateString().substring(0,5)}`
                  : 'Забронировать'

        const index = titleCard.toLowerCase().indexOf(valueInput.toLowerCase());
        const before = titleCard.substring(0, index);
        const extractLen = index + valueInput.length;
        const extractedVal = titleCard.substring(index, extractLen);
        const after = titleCard.substring(extractLen, titleCard.length);

        return (
            <NavLink to={`/books/${category}/${id}`} key={id} >
                <div className="card" data-test-id='card' >
                    <img src={img} alt="img" className='card__img' />
                    <div className="card__wrapper">
                        <div className="card__score"> {(rating)? setStar(rating) : <h2>ещё нет оценок</h2>} </div>
                        <div className='card__title'>
                          <h3> {before}<span data-test-id='highlight-matches' style={{color:'rgb(255, 82, 83)'}}>{extractedVal}</span>{after} </h3>
                        </div>
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