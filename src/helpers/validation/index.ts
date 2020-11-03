import { useMemo } from 'react';

import { Schema } from 'joi';
import { set, isEmpty } from 'lodash';

type Result = {
  errors?: any;
  hasErrors: boolean;
};

export function useValidation(schema: Schema, data?: any): Result {
  return useMemo(() => Validation(schema, data), [schema, data]);
}

export default function Validation(schema: Schema, data?: any): Result {
  const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });

  const errors = error
    ? error.details.reduce((acc, { path, message }) => set(acc, path, message.replace(/".*" (is)?/, '')), {})
    : error;

  return { errors, hasErrors: !isEmpty(errors) };
}
