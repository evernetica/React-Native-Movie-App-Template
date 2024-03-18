import axios from "axios";
import {apiKey} from '../constants';

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

export const image500 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint: string, params: string) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;

    } catch (error) {
        console.log('error',error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovieEndpoint, '')
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovieEndpoint, '')
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovieEndpoint, '')
}