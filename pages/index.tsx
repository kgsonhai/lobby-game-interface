import { GetServerSidePropsContext } from "next";

import DefaultLayout from "@/layout/DefaultLayout";
import Game from "@/layout/component/Game";

export interface IUrlParams {
  gameCategories?: string;
  search?: string;
}

const HomePage = ({ gameCategories, search }) => (
  <DefaultLayout>
    <Game gameCategories={gameCategories} search={search} />
  </DefaultLayout>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameCategories, search }: IUrlParams = context.query;
  const serializedGameCategories = gameCategories ? String(gameCategories) : "";
  const serializedSearch = search ? String(search) : "";

  return {
    props: {
      gameCategories: serializedGameCategories,
      search: serializedSearch,
    },
  };
}

export default HomePage;
