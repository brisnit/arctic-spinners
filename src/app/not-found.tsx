import { ButtonLink } from "@/components/shared/button-link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="display text-[8rem] leading-none text-arctic sm:text-[12rem]">404</p>
      <h1 className="display mt-2 text-4xl text-navy sm:text-5xl">This one got away.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved. Let’s get you back on the water.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" size="xl">
          Shop the lures
        </ButtonLink>
        <ButtonLink href="/" size="xl" variant="outline">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}
