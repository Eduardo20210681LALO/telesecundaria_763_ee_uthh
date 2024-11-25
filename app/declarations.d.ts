declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { FlatListProps, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
  
    export interface CarouselProps<T> extends FlatListProps<T> {
      data: T[];
      renderItem: (info: { item: T; index: number }) => JSX.Element;
      sliderWidth: number;
      itemWidth: number;
      firstItem?: number;
      loop?: boolean;
      autoplay?: boolean;
      containerCustomStyle?: StyleProp<ViewStyle>;
      contentContainerCustomStyle?: StyleProp<ViewStyle>;
      inactiveSlideScale?: number;
      inactiveSlideOpacity?: number;
    }
  
    export default class Carousel<T> extends Component<CarouselProps<T>> {}
  }
  