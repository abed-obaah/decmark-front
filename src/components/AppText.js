import styled from 'styled-components/native';
import { SIZES } from '../constants/theme';

export const LargeText = styled.Text`
  color: ${({theme}) => theme.PRIMARY_TEXT_COLOR};
  font-size: ${SIZES.xl}px;
  font-weight: bold;
`

export const MediumText = styled.Text`
  color: ${({theme}) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.md}px;
  line-height: 25px;
`

export const SmallText = styled.Text`
  color: ${({theme}) => theme.SECONDARY_TEXT_COLOR};
  font-size: ${SIZES.sm}px;
  line-height: 15px;
`

export const LinkText = styled.Text`
  color: ${({theme}) => theme.darkGold};
`