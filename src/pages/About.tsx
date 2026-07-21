function About() {
    return (
        <div className="container py-20 max-w-5xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-8 text-center">
                About DEEZ2FLY™️
            </h1>

            <div className="space-y-6 text-lg text-gray-700 leading-8">

                <p>
                    Founded in <strong>2026</strong>, <strong>DEEZ2FLY™️</strong> was
                    established with a simple vision: to create clothing that empowers
                    people to express confidence, individuality, and style without
                    compromise.
                </p>

                <p>
                    The brand was founded by <strong>AILOJE SAMUEL OMOGBAI</strong>,
                    alongside co-founder <strong>OBINNA (DOGOD)</strong>, combining
                    creativity, ambition, and a shared passion for modern streetwear
                    to build a fashion brand that stands out.
                </p>

                <p>
                    At <strong>DEEZ2FLY™️</strong>, we believe fashion is more than
                    just clothing—it's a statement of identity. Every collection is
                    thoughtfully designed with premium quality, comfort, and
                    originality in mind, giving you the confidence to stand out
                    wherever life takes you.
                </p>

                <p>
                    From everyday essentials to bold statement pieces, our mission is
                    to deliver apparel that reflects ambition, authenticity, and the
                    fearless spirit of those who refuse to blend in.
                </p>

            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Our Values
                </h2>

                <div className="grid gap-8 md:grid-cols-2">

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">
                            Premium Quality
                        </h3>

                        <p className="text-gray-600">
                            Every product is crafted using carefully selected materials
                            to ensure lasting comfort, durability and style.
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">
                            Originality
                        </h3>

                        <p className="text-gray-600">
                            We create unique designs that allow every customer to
                            express individuality with confidence.
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">
                            Confidence
                        </h3>

                        <p className="text-gray-600">
                            Our clothing is designed to inspire boldness,
                            self-belief and confidence.
                        </p>
                    </div>

                    <div className="rounded-xl border p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">
                            Community
                        </h3>

                        <p className="text-gray-600">
                            DEEZ2FLY™️ is more than clothing—it's a community.
                        </p>
                    </div>

                </div>
            </div>

            <div className="mt-20 text-center">
                <h2 className="text-4xl font-extrabold">
                    DEEZ2FLY™️
                </h2>

                <p className="mt-4 text-xl italic text-gray-600">
                    Wear the Vision. Live the Lifestyle. Fly Beyond Limits.
                </p>
            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold mb-6">
                    Contact Us
                </h2>

                <div className="space-y-4">

                    <a
                        href="https://instagram.com/deez_2fly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://wa.me/2347012908531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-green-600 hover:underline"
                    >
                        WhatsApp
                    </a>

                </div>
            </div>
        </div>
    );
}

export default About;