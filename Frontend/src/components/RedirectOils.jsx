import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const RedirectOils = () => {
  const { categoryId } = useParams();
  return <Navigate to={`/solutions/industrial/oils/${categoryId}`} replace />;
};

export default RedirectOils;
