import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';

function DisplayMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement :', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <Menu categories={categories}/>
  );
}

export default DisplayMenu;
