from manim import *


class ComplexPlaneExample(Scene):
    def construct(self):
        plane = ComplexPlane().add_coordinates()
        self.add(plane)
        d1 = Dot(plane.n2p(2 + 1j), color=YELLOW)
        d2 = Dot(plane.n2p(-3 - 2j), color=YELLOW)
        label1 = MathTex("2+i").next_to(d1, UR, 0.1)
        label2 = MathTex("-3-2i").next_to(d2, UR, 0.1)
        self.add(
            d1,
            label1,
            d2,
            label2,
        )

class Test(Scene):
    def construct(self):

        circle = Circle(fill_opacity=0.75, color=RED).scale(2).shift(LEFT * 1.5)
        square = Square(fill_opacity=0.75, color=GREEN).scale(2).shift(RIGHT * 1.5)

        group = VGroup(circle, square)

        self.play(Write(group))

        self.play(group.animate.scale(0.5).shift(UP * 1.6))

        union = Union(circle, square, fill_opacity=1, color=BLUE)

        for operation, position, name in zip(
            [Intersection, Union, Difference],
            [LEFT * 4.5, ORIGIN, RIGHT * 4.5],
            ["Intersection", "Union", "Difference"],
        ):
            result = operation(circle, square, fill_opacity=1, color=DARK_BLUE)
            result_position = DOWN * 1.3 + position

            label = Tex(name).move_to(result_position).scale(0.8)

            self.play(FadeIn(result))

            self.play(
                AnimationGroup(
                    result.animate.move_to(result_position),
                    Write(label, run_time=0.5),
                    lag_ratio=0.8,
                )
            )