import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutUs() {
  return (
    <section className="bg-background my-8 md:my-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">About Us</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat temporibus animi ullam eos nihil maxime corporis, nisi nobis hic accusantium vero iure? Cupiditate laudantium veniam at exercitationem, non saepe pariatur!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consectetur, deserunt labore repellendus quaerat aliquam, laborum reprehenderit ratione, ducimus blanditiis odio? Laudantium blanditiis nam, quam beatae voluptatum aut illo ea.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Promise</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla labore at iure officiis exercitationem fuga, dolore facere in blanditiis vel minus aliquid? Tenetur neque omnis placeat, corrupti officia maiores quaerat!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

