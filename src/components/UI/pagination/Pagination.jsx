import React from 'react';
import {usePaginaion} from "../../../hooks/usePagintaion";

const Pagination = ({totalPages, page, changePage}) => {
    let pageArray = usePaginaion(totalPages);
    return (
        <div className="page__wrapper">
            {pageArray.map(p =>
                <span
                    onClick={() => {changePage(p)}}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}>{p}</span>
            )}
        </div>
    );
};

export default Pagination;