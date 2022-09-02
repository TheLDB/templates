use axum::{routing::get, Router};
use std::net::SocketAddr;

pub mod routes;
use routes::handler::handler;

mod prisma;
use prisma::PrismaClient;

#[tokio::main]
async fn main() {
    
    dotenv::dotenv().ok();
    // create prisma client
    let client: PrismaClient = prisma::new_client().await.unwrap();

    let test = client.users().find_many(vec![]).exec().await;
    if let Ok(test) = test {
        println!("{:?}", test);
    }
    else {
        println!("issue")
    }
    
    // build our application with a route
    let app = Router::new().route("/", get(handler));

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}