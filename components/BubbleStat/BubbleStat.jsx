import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Virtual } from "swiper";

import { getStatsByCategory } from "../../store/slices/stats";
import { BubbleBlock } from "./BubbleBlock/BubbleBlock";
import Loader from "react-loader-spinner";

import styles from "./BubbleStat.module.scss";
import { useWindowSize } from "../../hooks/useWindowSize";

const BubbleStat = () => {
  const dispatch = useDispatch();
  const { statsByCategoryExpense, categoryStatLoading } = useSelector(
    ({ stats }) => stats
  );

  React.useEffect(() => {
    dispatch(getStatsByCategory());
  }, []);

  const groupStats = () => {
    return statsByCategoryExpense.reduce((result, current) => {
      if (
        !Object.prototype.hasOwnProperty.call(
          result,
          `${current.month}${current.year}`
        )
      ) {
        result[`${current.month}${current.year}`] = [];
      }

      result[`${current.month}${current.year}`].push(current);

      return result;
    }, {});
  };

  const [stats, setStats] = React.useState(null);
  const [statsLength, setStatsLength] = React.useState(0);

  React.useEffect(() => {
    const stats = groupStats();

    const sortedStats = Object.entries(stats)
      .sort((obj1, obj2) => obj1[0] - obj2[0])
      .map((item) => item[1]);

    setStats(sortedStats);
    setStatsLength(sortedStats.length - 1 || 0);
  }, [statsByCategoryExpense]);

  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const canvasRef = React.useRef();

  const size = useWindowSize();

  React.useEffect(() => {
    const computedStyle = getComputedStyle(canvasRef.current);

    let width = canvasRef.current.clientWidth; // width with padding
    let height = canvasRef.current.clientHeight; // height with padding

    height -=
      parseFloat(computedStyle.paddingTop) +
      parseFloat(computedStyle.paddingBottom);
    width -=
      parseFloat(computedStyle.paddingLeft) +
      parseFloat(computedStyle.paddingRight);

    setCanvasWidth(width);
  }, [size]);

  return (
    <div className={styles.wrapper} ref={canvasRef}>
      {categoryStatLoading && (
        <div className={styles.loader}>
          <Loader type="Oval" color="#24dffe" height={60} width={60} />
        </div>
      )}
      {!categoryStatLoading && stats?.length === 0 && (
        <div className={styles.no_data}>No data here :(</div>
      )}
      {!categoryStatLoading && stats && stats.length > 0 && (
        <Swiper
          modules={[Pagination]}
          initialSlide={statsLength}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {stats.map((block, index) => (
            <SwiperSlide key={index}>
              <BubbleBlock data={block} width={canvasWidth} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BubbleStat;
