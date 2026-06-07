import Section from "../components/Section";
import ReviewRow from "../components/ReviewRow";
import { reviewsList } from "../lib/content";

const starValues = [4.5, 5, 5];
const thumbTones = ["#3a3a3a", "#C43B15", "#7A5230"];

/**
 * Screen 17 — Testimonial rows (Edan K., Gol D. Roger, Jamie R.) with media thumbs.
 */
export default function ReviewsList() {
  return (
    <Section className="flex items-center bg-inkDeep py-28" full>
      <div className="w-full px-8 md:px-10">
        {reviewsList.reviews.map((r, i) => (
          <ReviewRow
            key={r.name}
            name={r.name}
            role={r.role}
            stars={r.stars}
            starValue={starValues[i]}
            quote={r.quote}
            highlight={r.highlight}
            thumbTone={thumbTones[i]}
            thumbImg={r.img}
            thumbAlt={r.alt}
          />
        ))}
      </div>
    </Section>
  );
}
