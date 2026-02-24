export function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-heading font-bold text-xl">
              Children&apos;s Party Finder
            </span>
            <p className="text-gray-400 text-sm mt-1">
              Find the perfect party for your child in London
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Children&apos;s Party Finder. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
