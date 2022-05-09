import React from 'react';

const Result = ({ result }) => (
    <li>
        {result} [{result.codeResult.format}]
    </li>
);

export default Result;
