import React from "react";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from "react-native-svg";

/** Friendly 3D-ish robot mascot used throughout Learna (hero, lesson panel, avatars). */
export default function RobotAvatar({ size = 120 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="head" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FDFEFF" />
          <Stop offset="1" stopColor="#D7E6F5" />
        </LinearGradient>
        <LinearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2B4E86" />
          <Stop offset="1" stopColor="#14264C" />
        </LinearGradient>
      </Defs>

      {/* antenna */}
      <Rect x="57" y="10" width="6" height="14" rx="3" fill="#BBD0EA" />
      <Circle cx="60" cy="9" r="6" fill="#5BB8FF" />

      {/* ears */}
      <Rect x="14" y="52" width="12" height="26" rx="6" fill="#C6D8EE" />
      <Rect x="94" y="52" width="12" height="26" rx="6" fill="#C6D8EE" />

      {/* head */}
      <Rect x="22" y="26" width="76" height="74" rx="26" fill="url(#head)" stroke="#BBD0EA" strokeWidth="1.5" />

      {/* visor / face */}
      <Rect x="32" y="40" width="56" height="42" rx="20" fill="url(#visor)" />

      {/* eyes */}
      <Circle cx="49" cy="60" r="6.5" fill="#7FE3FF" />
      <Circle cx="71" cy="60" r="6.5" fill="#7FE3FF" />
      <Circle cx="50.5" cy="58" r="2" fill="#FFFFFF" />
      <Circle cx="72.5" cy="58" r="2" fill="#FFFFFF" />

      {/* smile */}
      <Path d="M50 71 Q60 78 70 71" stroke="#7FE3FF" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* chest glow */}
      <Ellipse cx="60" cy="104" rx="20" ry="8" fill="#9FCBFF" opacity={0.5} />
    </Svg>
  );
}
