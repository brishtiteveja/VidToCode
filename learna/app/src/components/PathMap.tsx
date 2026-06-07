import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, nodeColors, radius, shadow } from "../theme";
import type { LessonNode, LessonSection } from "../data/lessons";

const NODE = 76;
const NODE_GAP = 116;
const DIVIDER_H = 70;
const AMP = 64; // horizontal swing

type LaidNode = { node: LessonNode; x: number; y: number; color: string };
type Divider = { label: string; y: number };

export default function PathMap({
  sections,
  width,
  onPressNode,
}: {
  sections: LessonSection[];
  width: number;
  onPressNode: (node: LessonNode, color: string) => void;
}) {
  const { nodes, dividers, height, dPath } = useMemo(() => {
    const centerX = width / 2;
    const offsets = [0, -AMP, 0, AMP];
    const laid: LaidNode[] = [];
    const divs: Divider[] = [];
    let y = 24;
    let nodeIdx = 0;

    sections.forEach((section) => {
      divs.push({ label: section.label, y: y + DIVIDER_H / 2 });
      y += DIVIDER_H;
      section.nodes.forEach((node) => {
        const x = centerX + offsets[nodeIdx % offsets.length];
        laid.push({ node, x, y: y + NODE / 2, color: nodeColors[nodeIdx % nodeColors.length] });
        y += NODE_GAP;
        nodeIdx += 1;
      });
    });

    // Smooth connector through node centers.
    let d = "";
    laid.forEach((n, i) => {
      if (i === 0) {
        d += `M ${n.x} ${n.y}`;
      } else {
        const prev = laid[i - 1];
        const midY = (prev.y + n.y) / 2;
        d += ` C ${prev.x} ${midY}, ${n.x} ${midY}, ${n.x} ${n.y}`;
      }
    });

    return { nodes: laid, dividers: divs, height: y + 40, dPath: d };
  }, [sections, width]);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Path d={dPath} stroke={colors.border} strokeWidth={6} strokeDasharray="2 14" strokeLinecap="round" fill="none" />
      </Svg>

      {dividers.map((d, i) => (
        <View key={`d${i}`} style={[styles.divider, { top: d.y - 14, width }]}>
          <View style={styles.rule} />
          <Text style={styles.dividerLabel}>{d.label}</Text>
          <View style={styles.rule} />
        </View>
      ))}

      {nodes.map(({ node, x, y, color }) => {
        const locked = node.state === "locked";
        const bg = locked ? "#C4CAD2" : color;
        return (
          <TouchableOpacity
            key={node.id}
            activeOpacity={0.85}
            onPress={() => onPressNode(node, color)}
            style={[styles.nodeWrap, { left: x - NODE / 2, top: y - NODE / 2 }]}
          >
            {node.state === "current" && <View style={[styles.halo, { borderColor: color }]} />}
            <View style={[styles.node, { backgroundColor: bg }, shadow.button]}>
              <Ionicons name={node.icon} size={32} color="#fff" />
              {locked && (
                <View style={styles.lockBadge}>
                  <Ionicons name="lock-closed" size={12} color="#8A94A6" />
                </View>
              )}
            </View>
            <Text style={[styles.nodeLabel, { width: 110, left: (NODE - 110) / 2 }]} numberOfLines={2}>
              {node.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    gap: 12,
  },
  rule: { flex: 1, height: 1.5, backgroundColor: colors.border },
  dividerLabel: { fontSize: 18, fontWeight: font.black, color: "#9FB0C4" },

  nodeWrap: { position: "absolute", width: NODE, alignItems: "center" },
  halo: {
    position: "absolute",
    width: NODE + 16,
    height: NODE + 16,
    top: -8,
    borderRadius: (NODE + 16) / 2,
    borderWidth: 4,
    opacity: 0.35,
  },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  lockBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#EEF1F5",
  },
  nodeLabel: {
    position: "absolute",
    top: NODE + 6,
    textAlign: "center",
    fontSize: 13,
    fontWeight: font.semibold,
    color: colors.navySoft,
  },
});
