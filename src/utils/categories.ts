import RankedSvg from '../assets/ranked.svg';
import DuelSvg from '../assets/duel.svg';
import FunSvg from '../assets/fun.svg';
import TrainingSvg from '../assets/training.svg';
import { SvgProps } from 'react-native-svg';

export interface ICategoriesProps {
  id: string;
  title: string;
  icon: React.FC<SvgProps>
}

export const categories: ICategoriesProps[] = [
  { id: '1', title: 'Ranqueada', icon: RankedSvg },
  { id: '2', title: 'Duelo 1x1', icon: DuelSvg },
  { id: '3', title: 'Diversão', icon: FunSvg },
  { id: '4', title: 'Treino', icon: TrainingSvg },
]