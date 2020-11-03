import '@fortawesome/fontawesome-free/css/all.min.css';

import './styles/styles.less';

import reportWebVitals from './reportWebVitals';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.locale('ru');
dayjs.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

const isDevelop = process.env.NODE_ENV === 'development';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(isDevelop ? console.log : undefined);
