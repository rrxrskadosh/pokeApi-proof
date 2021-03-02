import React from 'react'

const PokemonThumb = ({id, image, name, type, showSidebar, setShowSidebar }) => {
    const style = type + " thumb-container";
    return (
        <div className={style} onClick={() => setShowSidebar(!showSidebar)}>
            <div className="number"><small>#0{id}</small></div>

            { image ? 
                <img src={image} alt={name} /> : 
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} alt="unknow" /> 
            }
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonThumb;