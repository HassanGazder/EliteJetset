import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Compass, Users, Calendar } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout";
import Button from "../components/common/Button";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section 
        className="relative min-h-[500px] md:min-h-[600px] flex items-center text-white"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover the World with Wanderlust Travels
            </h1>
            <p className="text-xl mb-8 text-slate-200">
              Let our expert travel agents help you plan the journey of a lifetime with personalized service and exclusive packages.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="primary">Become an Agent</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-20">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Why Choose Wanderlust Travels?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Exclusive Destinations</h3>
              <p className="text-slate-600">
                Access to unique and off-the-beaten-path locations worldwide.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Compass className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Expert Guidance</h3>
              <p className="text-slate-600">
                Personalized advice from experienced travel specialists.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Dedicated Agents</h3>
              <p className="text-slate-600">
                Personal travel agents committed to crafting your perfect trip.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 p-3 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Flexible Planning</h3>
              <p className="text-slate-600">
                Customizable itineraries that adapt to your preferences and schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 lg:p-16 text-center md:text-left">
              <div className="md:max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Ready to Join Our Network of Travel Agents?
                </h2>
                <p className="text-lg mb-8 text-teal-100">
                  Register today to become a travel agent with Wanderlust Travels and start earning commissions while helping clients explore the world.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Link to="/register">
                    <Button variant="secondary">Register Now</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-700">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;