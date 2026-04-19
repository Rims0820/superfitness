import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="glass mx-4 mb-4 mt-10 p-10 rounded-3xl border border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">
            Fit<span className="text-primary">AI</span>
          </h2>
          <p className="text-gray-400 max-w-sm font-medium">
            The world's most advanced AI fitness companion. Join thousands of athletes
            pushing their limits every single day.
          </p>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">Workouts</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Nutrition</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Connect</h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 glass rounded-xl hover:text-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="p-3 glass rounded-xl hover:text-primary transition-colors"><FaInstagram /></a>
            <a href="#" className="p-3 glass rounded-xl hover:text-primary transition-colors"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mt-10 pt-6 text-center text-gray-500 text-sm font-medium">
        © {new Date().getFullYear()} FitAI. Built for Champions.
      </div>
    </footer>
  );
};

export default Footer;