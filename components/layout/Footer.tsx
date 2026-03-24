export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} NextFLIX. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tu plataforma de gestión de series favorita
          </p>
        </div>
      </div>
    </footer>
  );
};