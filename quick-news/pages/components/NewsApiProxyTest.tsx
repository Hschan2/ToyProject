import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

interface News {
    name: string;
    url: string;
}

interface HomeProps {
    newsList: News[];
}

const Home: NextPage<HomeProps> = ({ newsList }) => {
    return (
        <div className="bg-bc min-h-screen">
			<div className="flex justify-center">
				<h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-10 md:text-4xl">
					News Application
				</h2>
			</div>
			<div className="flex justify-center items-center flex-col">
				<h3 className="text-secondary text-2xl font-raleway font-bold uppercase tracking-wide mb-10 md:text-lg">
					Get Top <span className="text-danger">News</span> Quickly
				</h3>
				{newsList.map((news, index) => {
					return (
						<Link href={news.url} key={index}>
							<div className="flex items-center text-lg px-10 mb-10 font-light font-raleway h-32 w-3/6 rounded-sm border-2 border-danger text-lightYellow cursor-pointer transition duration-300 hover:border-primary hover:text-danger md:w-80 md:h-40">
								<h3>{news.name}</h3>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    try {
        const { data: newsList } = await axios.get<News[]>('/api/news-api-proxy');
        return { props: { newsList } };
    } catch (error) {
        console.error(error);
        return { props: { newsList: [] } };
    }
};

export default Home;