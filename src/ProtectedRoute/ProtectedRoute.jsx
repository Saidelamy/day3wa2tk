import React from 'react'
import { Navigate } from 'react-router-dom';

// عشان لو فيه حد كتب باث يروح للهوم مثلا من غير ما يكون عامل لوجين يروح يعمل لوجين الاول بعدها يروح للهوم
export default function ProtectedRoute(props) {
    if (!localStorage.getItem('userToken')) {
        return <Navigate to='/login' />
    }
    else {
        return props.children;
    }
}
