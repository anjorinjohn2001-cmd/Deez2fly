function About() {
    return (
        <div className="container py-20 max-w-4xl">
            <h1 className="text-5xl font-bold mb-8">About DEEZ2FLY</h1>

            <p className="text-lg text-gray-700 leading-8">
                DEEZ2FLY is a premium streetwear brand built for people who want to
                stand out. We focus on quality, confidence and modern fashion.
            </p>

            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6">
                    Contact Us
                </h2>

                <div className="space-y-4">

                    <a
                        href="https://instagram.com/deez_2fly"
                        target="_blank"
                        className="block text-blue-600 text-lg"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://wa.me/2347012908531"
                        target="_blank"
                        className="block text-green-600 text-lg"
                    >
                        WhatsApp
                    </a>

                </div>
            </div>
        </div>
    );
}

export default About;