import React from 'react';
import './AnimalCard.css';
import PropTypes from 'prop-types';

export default function AnimalCard({
    nom,
    nomScientifique,
    taille,
    alimentation,
    additional,
    showAdditional
}) {
    return (
        <div className="animal-wrapper">
            <h2>{nom}</h2>
            <p><strong>Nom Scientifique :</strong> {nomScientifique}</p>
            <p><strong>Taille :</strong> {taille} cm</p>
            <p><strong>Régime Alimentaire :</strong> {alimentation.join(', ')}</p>
            {additional && additional.notes && (
                <p><strong>Notes :</strong> {additional.notes}</p>
            )}
            {additional && additional.lien && (
                <p>
                    <a href={additional.lien} target="_blank" rel="noopener noreferrer">En savoir plus</a>
                </p>
            )}
            {additional && (
                <button onClick={() => showAdditional(additional)}>Plus d'Info</button>
            )}
        </div>
    )
}

AnimalCard.propTypes = {
    additional: PropTypes.shape({
        lien: PropTypes.string,
        notes: PropTypes.string
    }),
    alimentation: PropTypes.arrayOf(PropTypes.string).isRequired,
    nom: PropTypes.string.isRequired,
    nomScientifique: PropTypes.string.isRequired,
    showAdditional: PropTypes.func.isRequired,
    taille: PropTypes.number.isRequired,
}

AnimalCard.defaultProps = {
    additional: {
        notes: 'No Additional Information'
    }
}
